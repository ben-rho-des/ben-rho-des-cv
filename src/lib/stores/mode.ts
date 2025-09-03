import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Mode = '🌞' | '🌚' | '🫥';

interface ModeState {
  theme: Mode;
  grid: boolean;
}

// Initialize with default values
const initialState: ModeState = {
  theme: '🌞',
  grid: false
};

function createModeStore() {
  const { subscribe, set, update } = writable<ModeState>(initialState);

  return {
    subscribe,
    
    // Initialize from localStorage and apply to body
    init: () => {
      if (!browser) return;
      
      const savedTheme = localStorage.getItem('theme') as Mode;
      const savedGrid = localStorage.getItem('grid') === 'true';
      
      const state: ModeState = {
        theme: savedTheme || '🌞',
        grid: savedGrid || false
      };
      
      set(state);
      applyToBody(state);
    },
    
    // Toggle theme between light and dark
    toggleTheme: () => {
      update(state => {
        const newTheme = state.theme === '🌞' ? '🌚' : '🌞';
        const newState = { ...state, theme: newTheme };
        
        if (browser) {
          localStorage.setItem('theme', newTheme);
          applyToBody(newState);
        }
        
        return newState;
      });
    },
    
    // Toggle grid mode
    toggleGrid: () => {
      update(state => {
        const newGrid = !state.grid;
        const newState = { ...state, grid: newGrid };
        
        if (browser) {
          localStorage.setItem('grid', newGrid.toString());
          applyToBody(newState);
        }
        
        return newState;
      });
    },
    
    // Set grid mode explicitly (for route-based activation)
    setGrid: (enabled: boolean) => {
      update(state => {
        const newState = { ...state, grid: enabled };
        
        if (browser) {
          applyToBody(newState);
        }
        
        return newState;
      });
    },
    
    // Apply current state to body classes
    applyCurrent: () => {
      if (!browser) return;
      
      subscribe(state => {
        applyToBody(state);
      })();
    }
  };
}

// Apply mode state to body classes
function applyToBody(state: ModeState) {
  if (!browser) return;
  
  const body = document.body;
  
  // Remove all mode classes
  body.classList.remove('mode-🌞', 'mode-🌚', 'mode-🫥');
  
  // Add current theme
  body.classList.add(`mode-${state.theme}`);
  
  // Add grid mode if enabled
  if (state.grid) {
    body.classList.add('mode-🫥');
  }
}

export const modeStore = createModeStore();
