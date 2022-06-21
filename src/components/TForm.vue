<template>
  <t-modal :show="showModal" @close-modal="showModal=false">
    <p>The form contains error(s) and can't be submitted!</p>
    <t-button label="OK" @clicked="showModal=false"/>
  </t-modal>

  <form @submit="onSubmit">
    <t-control
      v-for="item in controlsKeys"
      :key="item"
      :control="item"
      :type="controls[item].type"
      :label="controls[item].label"
      :value="controlsData[item].value"
      :options="controls[item].options"
      :error="controlsData[item].error"
      :errorMessage="controlsData[item].errorMessage"
      @has-input="onHasInput"
      @blured="onBlured"
    />

    <t-button label="submit"/>
  </form>
</template>

<script>
import TControl from "./TControl.vue";
import TButton from "./TButton.vue";
import TModal from "./TModal.vue";
import validator from "../utils/validator.js";

export default {
  name: "TForm",
  props: {
    controls: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      controlsData: {},
    };
  },
  created() {
    this.controlsKeys.forEach((element) => {
      this.controlsData[element] = {};
      this.controlsData[element].value = this.controls[element].initialValue;
      this.controlsData[element].error = false;
      this.controlsData[element].errorMessage = "";
    });
  },
  computed: {
    controlsKeys() {
      return Object.keys(this.controls);
    },
    allControlsErrors() {
      return this.controlsKeys.reduce((acc, cur) => {
        return this.controlsData[cur].error || acc;
      }, false);
    },
  },
  methods: {
    onHasInput(payload) {
      this.controlsData[payload.control].value = payload.value;
    },
    onBlured(control) {
      this.validate(control);
    },
    validate(control) {
      let error = false;
      this.controls[control].validationRules.forEach((ruleObject) => {
        if (!error) {
          const ruleFunction = validator[ruleObject.rule];
          const value = this.controlsData[control].value;
          const result =
            "par" in ruleObject
              ? ruleFunction(value, ruleObject.par)
              : ruleFunction(value);
          if (!result) {
            this.controlsData[control].error = true;
            this.controlsData[control].errorMessage = ruleObject.message;
            error = true;
          }
        }
      });
      if (!error) {
          this.controlsData[control].error = false
          this.controlsData[control].errorMessage = ''
      }
    },

    onSubmit(e) {
      e.preventDefault();

      this.controlsKeys.forEach(control => {
        this.validate(control)
      }) 

      if(this.allControlsErrors) {
        this.showModal = true
        return
      }

      this.sendFormData()
    },

    sendFormData () {
      let data = {}

      this.controlsKeys.forEach(control => {
        data[control] = this.controlsData[control].value
      })
      this.$emit("submitted", data);
    }
  },
  emits: ["submitted"],
  components: { TControl, TButton, TModal },
};
</script>

<style lang="stylus" scoped></style>
