import React, { useState } from 'react';
import { useVocab } from '../../hooks/useVocab';
import { useLanguage } from '../../context/LanguageContext';
import './Admin.css';

const AdminModule = () => {
  const { vocabList, addVocab, removeVocab } = useVocab();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState({
    korean: '',
    translation: '',
    romanization: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.korean || !formData.translation) return;
    
    addVocab(formData);
    setFormData({ korean: '', translation: '', romanization: '' }); // Reset form
  };

  return (
    <div className="admin-container">
      <div className="admin-glass-card">
        <h1 className="admin-title">
          {t('admin_title')}
        </h1>
        
        <div className="admin-grid">
          {/* Add Form */}
          <div className="admin-form-section glass-panel">
            <h2>{t('admin_add_word')}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-group">
                <label>{t('admin_korean')}</label>
                <input 
                  type="text" 
                  name="korean" 
                  value={formData.korean} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. 사과"
                />
              </div>
              <div className="form-group">
                <label>{t('admin_translation')}</label>
                <input 
                  type="text" 
                  name="translation" 
                  value={formData.translation} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. Apple / 苹果"
                />
              </div>
              <div className="form-group">
                <label>{t('admin_romanization')}</label>
                <input 
                  type="text" 
                  name="romanization" 
                  value={formData.romanization} 
                  onChange={handleChange} 
                  placeholder="e.g. sagwa"
                />
              </div>
              <button type="submit" className="btn-primary w-100 mt-3">
                {t('admin_btn_add')}
              </button>
            </form>
          </div>

          {/* List View */}
          <div className="admin-list-section glass-panel">
            <h2>{t('admin_current_list')} ({vocabList.length})</h2>
            <div className="vocab-list">
              {vocabList.map(word => (
                <div key={word.id} className="vocab-list-item">
                  <div className="vocab-info">
                    <span className="vocab-korean">{word.korean}</span>
                    <span className="vocab-translation">{word.translation}</span>
                  </div>
                  <button 
                    className="btn-danger-sm" 
                    onClick={() => {
                      if (window.confirm(t('admin_confirm_delete'))) {
                        removeVocab(word.id);
                      }
                    }}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminModule;
