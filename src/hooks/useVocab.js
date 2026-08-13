import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { vocabData as fallbackVocab } from '../components/Vocabulary/vocabData';

const API_URL = 'http://localhost:3000/api';

export const useVocab = () => {
  const [vocabList, setVocabList] = useState([]);
  const [srsProgress, setSrsProgress] = useState([]); // Array of full progress objects
  const [userStats, setUserStats] = useState({ xp: 0, streak: 0 });
  const { token } = useAuth();

  useEffect(() => {
    fetchVocab();
  }, []);

  useEffect(() => {
    if (token) {
      fetchProgress();
      fetchStats();
    } else {
      setSrsProgress([]);
      setUserStats({ xp: 0, streak: 0 });
    }
  }, [token]);

  const fetchVocab = async () => {
    try {
      const res = await axios.get(`${API_URL}/vocab`);
      if (res.data && res.data.length > 0) {
        setVocabList(res.data);
      } else {
        // Fallback to initial local data if db is empty and seed it
        setVocabList(fallbackVocab);
        if (token) {
          // Auto-seed for the first time
          Promise.all(fallbackVocab.map(w => 
            axios.post(`${API_URL}/vocab`, { 
              korean: w.korean, 
              translation: w.translation, 
              romanization: w.romanization 
            }).catch(e => console.log('Seed error', e))
          ));
        }
      }
    } catch (e) {
      console.error("Error fetching vocab", e);
      setVocabList(fallbackVocab);
    }
  };

  const fetchProgress = async () => {
    try {
      const res = await axios.get(`${API_URL}/progress`);
      setSrsProgress(res.data); // Stores the full SM-2 progress objects
    } catch (e) {
      console.error("Error fetching progress", e);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/stats`);
      setUserStats(res.data);
    } catch (e) {
      console.error("Error fetching user stats", e);
    }
  };

  const addVocab = useCallback(async (newWord) => {
    try {
      const res = await axios.post(`${API_URL}/vocab`, newWord);
      setVocabList(prev => [...prev, res.data]);
    } catch (e) {
      console.error("Add vocab error", e);
    }
  }, []);

  const removeVocab = useCallback(async (idToRemove) => {
    try {
      await axios.delete(`${API_URL}/vocab/${idToRemove}`);
      setVocabList(prev => prev.filter(w => w.id !== idToRemove));
    } catch (e) {
      console.error("Remove vocab error", e);
    }
  }, []);

  // Review a word for SRS (isKnown: boolean)
  const reviewWord = useCallback(async (wordId, isKnown) => {
    if (!token) return; // Must be logged in
    try {
      await axios.post(`${API_URL}/progress/review`, { wordId, isKnown });
      fetchProgress(); // Re-fetch progress to get updated nextReviewDate
      fetchStats();    // Re-fetch stats to get new XP/Streak
    } catch (e) {
      console.error("Review word error", e);
    }
  }, [token]);

  const resetProgress = useCallback(async () => {
    if (!token) return;
    try {
      await axios.delete(`${API_URL}/progress`);
      setSrsProgress([]);
      setUserStats({ xp: 0, streak: 0 });
    } catch (e) {
      console.error("Reset progress error", e);
    }
  }, [token]);

  return { vocabList, addVocab, removeVocab, srsProgress, userStats, reviewWord, resetProgress };
};
