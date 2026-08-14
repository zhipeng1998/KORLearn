class AudioPlayer {
  constructor() {
    this.currentAudio = null;
    this.audioCache = new Map();
  }

  play(url) {
    // Stop currently playing audio if any
    this.stop();

    let audio;
    if (this.audioCache.has(url)) {
      audio = this.audioCache.get(url);
    } else {
      audio = new Audio(url);
      this.audioCache.set(url, audio);
    }

    this.currentAudio = audio;
    
    // Play with a catch block to handle browser autoplay policies
    audio.currentTime = 0;
    audio.play().catch(error => {
      console.warn("Audio playback failed:", error);
    });
  }

  stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  // Preload a list of audio URLs
  preload(urls) {
    urls.forEach(url => {
      if (!this.audioCache.has(url)) {
        const audio = new Audio(url);
        audio.preload = 'auto';
        this.audioCache.set(url, audio);
      }
    });
  }
}

export const globalAudioPlayer = new AudioPlayer();
