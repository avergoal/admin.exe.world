<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import {useMediaStore} from '@/stores/media'
import PlusIcon from '@/components/icons/PlusIcon.vue'
import CoverLoadingIcon from '@/components/icons/CoverLoadingIcon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'

const emit = defineEmits(['onDeleteSuccess'])

const props = defineProps({
    type: {
        default: 'carousel'
    },
    src: Array,
    multiple: {
        default: false
    }
})

const file = ref(null)
const preloadSrc = ref([])
const mediaStore = useMediaStore()
const route = useRoute()
const loading = ref(false)

const gameId = computed(() => route.params.id)
const getMediaTypes = computed(() => mediaStore.getMediaTypes)
const mediaType = computed(() =>
    Object.values(getMediaTypes.value).find((media) => media.code === props.type)
)

const inputClick = () => {
    file.value.click()
}

const uploadImage = (e) => {
    const images = e.target.files;
    let params = {
        gid: gameId.value,
        type: props.type
    };
    if (!props.multiple)
        loading.value = true;
    let tmpSrc = JSON.parse(JSON.stringify(preloadSrc.value));
    const uploadPromises = [];

    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const formImage = images[i];
        let uploadPromise;
        const reader = new FileReader();

        reader.onload = () => {
            if (props.multiple) {
                preloadSrc.value.push({filename: reader.result, loading: true});
            } else {
                preloadSrc.value = [{filename: reader.result}]
            }
        };
        const formData = new FormData();
        formData.append('file', formImage);
        Object.keys(params).forEach((key) => {
            formData.append(key, params[key]);
        });
        uploadPromise = new Promise((resolve, reject) => {
            mediaStore
                .uploadMedia(formData)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });

        uploadPromises.push(uploadPromise);

        reader.readAsDataURL(image);
    }
    const successfulResponses = [];
    const errorResponses = [];

    Promise.all(uploadPromises.map(promise =>
        promise
            .then(response => successfulResponses.push(response))
            .catch(error => errorResponses.push(error))
    ))
        .then(() => {
            if (props.multiple && successfulResponses.length) {
                preloadSrc.value = tmpSrc;
                successfulResponses.forEach(r => {
                    preloadSrc.value.push({
                        fid: r.data.response.result.fid,
                        filename: r.data.response.result.url,
                        delete_code: r.data.response.result.delete_code,
                    })
                })
                tmpSrc = JSON.parse(JSON.stringify(preloadSrc.value));
            } else if (successfulResponses.length) {
                preloadSrc.value = [{
                    fid: successfulResponses[0].data.response.result.fid,
                    filename: successfulResponses[0].data.response.result.url,
                    delete_code: successfulResponses[0].data.response.result.delete_code,
                }];
            }

            errorResponses.forEach((error) => {
                console.error('Upload error:', error);
                preloadSrc.value = tmpSrc;
            });
        })
        .finally(() => {
            loading.value = false;
        });
};
//
// const deleteMedia = async (fid, delete_code) => {
//     let params = {
//         gid: gameId.value,
//         fid,
//         delete_code
//     }
//     const res = await mediaStore.deleteMedia(params)
//     if (res) {
//         emit('onDeleteSuccess')
//     }
// }
//
watchEffect(() => {
    preloadSrc.value = props.src
})
</script>
<template>
    <div class="cover">
        <div class="info">
            <div class="text">
                <p v-if="props.type === 'carousel'" class="sub-1">Карусель</p>
                <p v-if="props.type === 'carousel'" class="b-2-regular">
                    {{ mediaType?.w }}x{{ mediaType?.h }}. Used in the site's main carousel.
                </p>

                <p v-if="props.type === 'cover'" class="sub-1">Обложка</p>
                <p v-if="props.type === 'cover'" class="b-2-regular">
                    {{ mediaType?.w }}x{{ mediaType?.h }}. Used in the catalog showcase.
                </p>

                <p v-if="props.type === 'icon'" class="sub-1">Аватар</p>
                <p v-if="props.type === 'icon'" class="b-2-regular">
                    {{ mediaType?.w }}x{{ mediaType?.h }}. Used in the menu panel.
                </p>
            </div>
        </div>
        <div class="upload-content">
            <label
                :key="src?.fid"
                v-for="src in preloadSrc"
                :for="'cover_upload' + props.type"
                class="cover-label"
                :class="{ mid: props.type === 'cover', small: props.type === 'icon' }"
            >
                <cover-loading-icon class="loading" v-if="loading || src?.loading" />
                <img
                    :src="src.filename"
                    :class="{ blur: loading || src?.loading }"
                    :alt="src.filename"
                    v-if="src"
                    class="preload-image"
                />
                <span class="delete" @click.prevent="deleteMedia(src.fid, src.delete_code)">
                    <delete-icon />
                </span>
            </label>
            <label
                v-if="!preloadSrc?.length || props.multiple"
                :for="'cover_upload' + props.type"
                class="cover-label"
                :class="{ mid: props.type === 'cover', small: props.type === 'icon' }"
            >
                <plus-icon />
            </label>
            <input
                accept="image/*"
                :id="'cover_upload' + props.type"
                ref="file"
                :multiple="props.type === 'screenshot'"
                @change="uploadImage"
                type="file"
            />
            <button class="upload-button button-1" @click="inputClick">изменить</button>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import './scss/cover-input.scss';
</style>
