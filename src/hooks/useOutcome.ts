import { Question, Exodus } from "@/AppTypes"
import { computed, Ref, ref } from "vue"

export const useOutcome = (index: Ref<number>, isStart: Ref<boolean>) => {

  const questions = ref<Array<Question>>([])
  const exodus = ref<Array<Exodus>>([])
  const initialValues = ref<Array<number>>([])

  const defaultExodus = () => {
    index.value = 0
    exodus.value.forEach((outcome, index) => outcome.probability = initialValues.value[index])
    isStart.value = true
  }


  const sortOutcome = computed(() => {
    return exodus.value.sort((a, b) => {
      if (a.probability < b.probability) {
        return 1
      } else if (a.probability > b.probability) {
        return -1
      } else {
        return 0
      }
    })
  })

  const getTitle = computed(() => {
    return questions.value[index.value].title;
  });

  const nextQuestion = (answer: number) => {
    if (answer <= 0.5) {
      exodus.value.forEach((outcome) => {
        const newPair = outcome.pair.filter(
          (p) => p.number === index.value + 1
        );
        if (newPair.length !== 0) {
          outcome.probability =
            ((1 - newPair[0].good) * outcome.probability) /
            ((1 - newPair[0].good) * outcome.probability +
              (1 - newPair[0].bad) * (1 - outcome.probability));
        }
      });
    } else {
      exodus.value.forEach((outcome) => {
        const newPair = outcome.pair.filter(
          (p) => p.number === index.value + 1
        );
        if (newPair.length !== 0) {
          outcome.probability =
            (newPair[0].good * outcome.probability) /
            (newPair[0].good * outcome.probability +
              newPair[0].bad * (1 - outcome.probability));
        }
      });
    }

    exodus.value.forEach((outcome) => {
      if (outcome.probability >= 1) {
        isStart.value = false
      }
    });

    index.value++;
  };


  return {
    exodus,
    sortOutcome,
    questions,
    getTitle,
    initialValues,
    defaultExodus,
    nextQuestion
  }
}