import { ref } from "vue"

export const useApp = ()=>{
    const index = ref<number>(0)
    const isStart = ref<boolean>(false)


    return{
        index,
        isStart
    }
}