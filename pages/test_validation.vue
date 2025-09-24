<template>
    <div>
        <main>
            
            <div class="container">

                <h2>remove text </h2>

                <h1>Home page 23333333333</h1>

                <form @submit.prevent="submitForm">

                    <FormInput 
                        v-model:modelValue="formData.phone"
                        name="phone"
                        type="number"
                        :label="$t('Auth.mobile_number')"
                        :placeholder="$t('Auth.mobile_number')"
                        :validation-schema="validations.phone"
                        :showErrors="showValidation"
                    />

                    <FormInput 
                        v-model:modelValue="formData.email"
                        name="email"
                        type="email"
                        :label="$t('Auth.email')"
                        :placeholder="$t('Auth.email')"
                        :validation-schema="validations.email"
                        :showErrors="showValidation"
                    />

                    <FormInput 
                        v-model:modelValue="formData.fullname"
                        name="fullname"
                        type="text"
                        :label="$t('validation.fullName')"
                        :placeholder="$t('validation.fullName')"
                        :validation-schema="validations.fullname"
                        :showErrors="showValidation"
                    />

                    <FormInput 
                        v-model:modelValue="formData.lastnameee"
                        name="lastnameee"
                        type="text"
                        :label="$t('validation.koko')"
                        :placeholder="$t('validation.toto')"
                        :validation-schema="validations.lastnameee"
                        :showErrors="showValidation"
                    />
                    <FormInput 
                        v-model:modelValue="formData.iban"
                        name="iban"
                        type="text"
                        :label="$t('Auth.iban')"
                        :placeholder="$t('Auth.iban')"
                        :validation-schema="validations.iban"
                        :showErrors="showValidation"
                    />

                    <GlobalCustomDropdown 
                        v-model="formData.defaultSection" 
                        :options="defaultSections"
                        option-value="value"
                        placeholder="اختر القسم الأول" 
                        :label="$t('categories.default_section')"
                        :showValidation="showValidation"
                    />

                    <GlobalCustomDropdown 
                        v-model="formData.defaultSection2" 
                        :options="defaultSections"
                        option-value="value"
                        placeholder="اختر القسم الثاني" 
                        :label="$t('categories.default_section2')"
                        :showValidation="showValidation"
                    />

                    <GlobalCustomDropdown 
                        v-model="formData.defaultSection3" 
                        :options="defaultSections"
                        option-value="value"
                        placeholder="اختر القسم الثاني" 
                        :label="$t('categories.default_section2')"
                    />

                    <div class="position-relative single-input-upload mb-5">
                        <div class="main_input special-input without-edit">
                            <div
                                class="d-flex align-items-center justify-content-center gap-2 flex-grow-1 gray">
                                <span>{{ $t("settings.attach_image") }}</span>
                                <font-awesome-icon :icon="['fas', 'arrow-up-from-bracket']"
                                    class="edit-icon fz-16" />
                            </div>
                        </div>
                        <GlobalImgUploader 
                            ref="imageUploader"
                            acceptedFiles="image/*" 
                            :IsMultible="true" 
                            :resetTrigger="resetImageTrigger"
                            :showValidation="showValidation"
                            :required="true"
                            errorMessage="يرجى رفع صورة واحدة على الأقل"
                            @uploaded-images-updated="updateUploadedImages" />
                    </div>

                    <div class="d-flex gap-3">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <button type="button" class="btn btn-secondary" @click="handleResetForm">
                            Reset Form
                        </button>
                    </div>

                </form>

            </div>
            

    
        </main>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const showValidation = ref(false);

const { response } = responseApi();

const loading = ref(false);

const axios = useApi();

// Ref للـ image uploader
const imageUploader = ref(null);

// بيانات بسيطة جداً
const formData = reactive({
    phone: null,
    email: null,
    fullname: null,
    lastnameee: null,
    defaultSection: null,
    defaultSection2: null,
    defaultSection3: null,
    iban: null
});

const resetImageTrigger = ref(0);

// بيانات الـ dropdown
const defaultSections = ref([
    { name: 'مستلزمات الأطفال', value: 'baby_supplies' },
    { name: 'الأعشاب', value: 'herbs' },
    { name: 'الطبخ', value: 'cuisine' }
]);
                                                                                                                                
// validations بسيط
const { phoneNumber, email, fullName, lastnameee, iban } = useValidationSchema();
const validations = {
    phone: phoneNumber(),
    email: email(), 
    fullname: fullName(),
    lastnameee: lastnameee(),
    iban: iban()
};

// استخدام الـ composable للفحص
const { isFormValid, resetForm, scrollToFirstError } = useFormValidation();

// تحديد الـ dropdowns المطلوبة
const requiredDropdowns = ['defaultSection', 'defaultSection2'];

const uploadedImage = ref([]);
// دالة لإعادة تعيين الفورم (يمكن استدعاؤها من أي مكان)
const handleResetForm = () => {
    resetForm(formData, showValidation);
    uploadedImage.value = []; // إعادة تعيين الصور في الصفحة
    
    // إعادة تعيين الصور في الـ component مباشرة
    if (imageUploader.value) {
        imageUploader.value.uploadedImages = [];
    }
    
    resetImageTrigger.value++; // تؤدي trigger للـ component
    console.log('Reset triggered:', resetImageTrigger.value);
};

// دالة بسيطة لتحديث الصور
const updateUploadedImages = (images) => {
    uploadedImage.value = images;
};

const submitForm = async () => {
    showValidation.value = true;
    const isValid = isFormValid(formData, validations);

    if(!isValid){
        // التمرير إلى أول عنصر به خطأ
        if (!isValid) {
            scrollToFirstError(formData, validations);
        }
        console.log("22222222222");
    } else{
        console.log("11111111111");
        try {
        
        // إنشاء FormData ودمج كل البيانات
        const fd = new FormData();
        
        // إضافة بيانات الفورم العادية
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) {
                fd.append(key, value);
            }
        });
        
        // إضافة الصور
        if (uploadedImage.value.length > 0) {
            uploadedImage.value.forEach((file, index) => {
                fd.append(`images[${index}]`, file);
            });
        }
        
        const res = await axios.post('test_page_validation', fd);
        
        if (response(res) == "success") {
          console.log("Form submitted successfully!");
          // إعادة تعيين الفورم بعد النجاح
          Object.keys(formData).forEach(key => {
            formData[key] = null;
          });
          showValidation.value = false;
        } else {
          console.log("Server returned error");
        }
        
        loading.value = false;
      } catch (error) {
        console.error('Form submission error:', error);
        loading.value = false;
      }
    }

}
</script>


<style lang="scss">
.single-input-upload {
    .special-input {
        +input {
            width: 100%;
            height: 45px;
            top: 0;
            position: absolute;
            opacity: 0;
            cursor: pointer;
            z-index: 100;
            overflow: hidden;
        }
    }

    .uploaded-block {
        position: relative;
        width: 100px;
        height: 100px;
        border-radius: 10px;
        transition: all 0.3s ease;
        will-change: transform, opacity;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
        }
    }
}



.special-input {
    border: 1.5px dashed #C7C7C7;
}
</style>