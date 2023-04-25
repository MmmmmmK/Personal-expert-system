<template>
  <div class="container">
    <div class="load">
      <input
        type="file"
        id="file"
        class="not-show"
        ref="refFile"
        @change="parseFile"
      />
      <label class="btn-default" for="file">Load knowledge base</label>


    </div>


    <div class="question mt-1" v-if="index < questions.length && isStart">
      <p class="fs-2" style="text-align: center">{{ getTitle }}</p>
    </div>



    <div class="exodus mt-1" v-if="questions.length !== 0">
      <div v-for="(outcome, index) in sortOutcome" :key="outcome.name">
        <p class="fs-2 mt-1">
          Exodus {{ index + 1 }}: {{ outcome.name }}_________Probability:
          {{ outcome.probability > 0 ? outcome.probability : 0 }}
        </p>
      </div>
    </div>

<div class="answer mt-2" v-if="index < questions.length && isStart">
      <input
        type="button"
        class="btn-default fs-2"
        value="Yes"
        @click="nextQuestion(1)"
      />
      <input
        type="button"
        class="btn-default ml-2 fs-2"
        value="Don't know"
        @click="nextQuestion(0.5)"
      />
      <input
        type="button"
        class="btn-default ml-2 fs-2"
        value="No"
        @click="nextQuestion(0)"
      />
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useApp } from "./hooks/useApp";
import { useFile } from "./hooks/useFile";
import { useOutcome } from "./hooks/useOutcome";

export default defineComponent({
  name: "App",
  setup() {
    const { index, isStart } = useApp();

    const {
      exodus,
      sortOutcome,
      questions,
      getTitle,
      initialValues,
      defaultExodus,
      nextQuestion,
    } = useOutcome(index, isStart);

    const {  refFile, parseFile } = useFile(
      exodus,
      questions,
      initialValues,
      index,
      isStart
    );

    return {
      sortOutcome,
       refFile,
      index,
      questions,
      defaultExodus,
      getTitle,
      parseFile,
      nextQuestion,
      isStart,
    };
  },
});
</script>

<style lang="scss">
@use "@/assets/scss/properties.scss" as prop;

.container {
  display: grid;
  width: 80%;
  margin: 40px auto;
  grid-template-columns: 1fr;

  .load {
    display: flex;
    flex-flow: row;
    justify-content: center;
    margin: 15px;
  }

  .answer {
    display: flex;
    flex-flow: row;
    justify-content: center;
  }

  .question {
    margin: 10px auto;
    padding: 3px;
    width: 250px;
    justify-content: center;
    background: white;
    text-align: center;
    box-shadow: 0px 0px 10px 3px prop.$color-shadow;
  }

  .exodus {
    padding: 3px;
    //box-shadow: 0px 0px 10px 3px prop.$color-shadow;
    text-align: center;
  }

  .message {
    padding: 3px;
    //box-shadow: 0px 0px 10px 3px prop.$color-shadow;
    text-align: center;
  }
}

.not-show {
  display: none;
}

.red-message {
  color: prop.$color-button;
}
</style>