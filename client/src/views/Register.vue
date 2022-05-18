<template>
    <section class="section section-shaped section-lg my-0">
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-9">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-8"
                          class="border-0">
                        <template>
                            <div class="text-left text-muted mb-4">
                                <h2>Create an appointment</h2>
                            </div>
                            <form role="form">
                                <base-input alternative
                                            class="mb-3"
                                            placeholder="Short description"
                                            addon-left-icon="ni ni-bold">
                                </base-input>
                                <textarea class="form-control form-control-alternative mb-3" 
                                          rows="5" 
                                          placeholder="Describe your symptoms">
                                </textarea>
                                <base-input addon-left-icon="ni ni-calendar-grid-58">
                                    <flat-picker slot-scope="{focus, blur}"
                                                @on-open="focus"
                                                @on-close="blur"
                                                :config="{allowInput: true}"
                                                class="form-control datepicker"
                                                v-model="dates.simple">
                                    </flat-picker>
                                </base-input>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4">Create appoiment</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import flatPicker from "vue-flatpickr-component";
    import "flatpickr/dist/flatpickr.css";
    export default {
    components: {
        flatPicker
    },
    data() {
        return {
        dates: {
            simple: "2018-07-17"
        }
        };
    }
    };
</script>
<style>
</style>
