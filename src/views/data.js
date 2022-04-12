import { ref } from "vue"

export const hotData = {
    hotList: ref([]),
    city: ref('定位'),
    finished: ref(false),
    page: ref(1),
}

export const cinemaData = {
    list: ref([]),
    page: ref(1),
    finished: ref(false),
    city: ref(''),
    district: ref('')
}

export const cinSessData = {
    list: ref([]),
    page: ref(1),
    finished: ref(false),
    city: ref(''),
    district: ref(''),
    mid: ref(''),
}
