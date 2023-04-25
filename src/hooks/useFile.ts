import { Exodus, Probabilities, Question } from "@/AppTypes";
import { Ref, ref } from "vue";

export const useFile = (outcomes: Ref<Array<Exodus>>, questions: Ref<Array<Question>>,
  initialValues: Ref<Array<number>>, showIndex: Ref<number>, isStart: Ref<boolean>) => {
  const refFile = ref(null)
  const file = ref<File>()

  const parseFile = () => {
    showIndex.value = 0
    questions.value.splice(0, questions.value.length)
    outcomes.value.splice(0, outcomes.value.length)

    if (refFile.value !== null) {
      file.value = (refFile.value as HTMLInputElement).files![0]
    }

    const fileReader = new FileReader()
    fileReader.readAsText(file.value!, 'utf8')
    fileReader.onload = () => {
      const strs = (fileReader.result as string).split('\n')
        .map(value => value.substring(0, value.length - 1))

      const indexStart = strs.findIndex(value => value === 'Вопросы:') + 1
      const indexLast = strs.filter((value, index) => index >= indexStart)
        .findIndex(value => value === "") + indexStart

      strs.slice(indexStart, indexLast)
        .forEach(value => questions.value.push({ title: value }))

      strs.slice(indexLast + 1, strs.length)
        .forEach(value => {
          const arr = value.split(', ')
          const pairs: Array<Probabilities> = []
          arr.slice(2, arr.length)
            .forEach(v => {
              const pair = v.split(',')
              pairs.push({
                number: Number(pair[0]),
                good: Number(pair[1]),
                bad: Number(pair[2])
              })
            })
          initialValues.value.push(Number(arr[1]))
          outcomes.value.push({
            name: arr[0],
            probability: Number(arr[1]),
            pair: pairs
          })
        })
    }
    isStart.value = true
  }

  return {
    parseFile,
    refFile
  }
}