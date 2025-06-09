<template>
  <div class="calculator-container">
    <h1>TDEE 與 BMR 計算器</h1>
    
    <form @submit.prevent="calculate" class="calculator-form">
      <div class="form-group">
        <label for="gender">性別</label>
        <select id="gender" v-model="formData.gender" required>
          <option value="male">男性</option>
          <option value="female">女性</option>
        </select>
      </div>

      <div class="form-group">
        <label for="age">年齡</label>
        <input 
          type="number" 
          id="age" 
          v-model.number="formData.age" 
          min="1" 
          max="120" 
          required
        >
      </div>

      <div class="form-group">
        <label for="weight">體重 (kg)</label>
        <input 
          type="number" 
          id="weight" 
          v-model.number="formData.weight" 
          min="20" 
          max="300" 
          step="0.1" 
          required
        >
      </div>

      <div class="form-group">
        <label for="height">身高 (cm)</label>
        <input 
          type="number" 
          id="height" 
          v-model.number="formData.height" 
          min="100" 
          max="250" 
          required
        >
      </div>

      <div class="form-group">
        <label>活動水平</label>
        <div class="activity-level-options">
          <label
            v-for="level in activityLevels"
            :key="level.value"
            :class="['activity-option', { selected: formData.activityLevel === level.value }]"
          >
            <input
              type="radio"
              name="activityLevel"
              :value="level.value"
              v-model="formData.activityLevel"
              class="activity-radio"
            />
            <span class="activity-icon">
              <font-awesome-icon :icon="level.icon" />
            </span>
            <span class="activity-label">{{ level.label }}</span>
            <span v-if="level.beta" class="activity-badge">Beta</span>
            <span v-if="level.invite" class="activity-badge invite">Invite</span>
          </label>
        </div>
      </div>

      <button type="submit" class="calculate-btn">計算</button>
    </form>

    <div v-if="results" class="results">
      <h2>計算結果</h2>
      <div class="result-item">
        <h3>基礎代謝率 (BMR)</h3>
        <p>{{ Math.round(results.bmr) }} 卡路里/天</p>
      </div>
      <div class="result-item">
        <h3>每日總能量消耗 (TDEE)</h3>
        <p>{{ Math.round(results.tdee) }} 卡路里/天</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { calculateBMR, calculateTDEE, activityLevels } from '../utils/calculations';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCouch, faRunning, faWalking, faBiking, faDumbbell, faSwimmer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCouch, faRunning, faWalking, faBiking, faDumbbell, faSwimmer);

const formData = ref({
  gender: 'male',
  age: null,
  weight: null,
  height: null,
  activityLevel: 'sedentary'
});

const results = ref(null);

const calculate = () => {
  const bmr = calculateBMR(
    formData.value.weight,
    formData.value.height,
    formData.value.age,
    formData.value.gender
  );
  
  const tdee = calculateTDEE(bmr, formData.value.activityLevel);
  
  results.value = { bmr, tdee };
};
</script>

<style scoped>
.calculator-container {
  width: 100%;
  max-width: 600px;
  margin: 2rem;
  padding: 2rem;
  background-color: var(--color-background-soft);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.calculator-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: bold;
  color: var(--color-text);
}

input, select {
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--color-background);
  color: var(--color-text);
}

.calculate-btn {
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}

.calculate-btn:hover {
  background-color: #45a049;
}

.results {
  background-color: var(--color-background-mute);
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 2rem;
}

.result-item {
  margin-bottom: 1rem;
}

.result-item h3 {
  margin: 0;
  color: var(--color-text);
}

.result-item p {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4CAF50;
  margin: 0.5rem 0;
}

.activity-level-options {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.activity-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  width: calc(50% - 0.5rem);
  background: var(--color-background-mute);
  transition: border-color 0.2s, box-shadow 0.2s;
  position: relative;
}

.activity-option.selected {
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px #4CAF5033;
}

.activity-radio {
  display: none;
}

.activity-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.activity-label {
  font-weight: bold;
  color: var(--color-text);
}

.activity-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #eee;
  color: #888;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 4px;
}

.activity-badge.invite {
  background: #ffecb3;
  color: #b8860b;
}
</style> 