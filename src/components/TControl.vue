<template>
  <div class="form-control">
    <label :for="control">{{ label }}</label>
    <textarea
      v-if="type === 'textarea'"
      :id="control"
      :value="value"
      autocomplete="off"
      rows="5"
      class="resize-none"
      :class="{'invalid' : error}"
      @input="onInput"
      @blur="onBlured"
    />
    <select
      v-else-if="type === 'select'"
      :id="control"
      :value="value"
      autocomplete="off"
      :class="{'invalid' : error}"
      @input="onInput"
      @blur="onBlured"
    >
      <option v-for="item in options" :key="control + item" :value="item">
        {{ item }}
      </option>
    </select>
    <input
      v-else
      :id="control"
      :type="type"
      :value="value"
      autocomplete="off"
      :class="{'invalid' : error}"
      @input="onInput"
      @blur="onBlured"
    />
    <div v-if="error" class="error-message">errorMessage</div>
  </div>
</template>

<script>
export default {
  name: "TControl",
  props: {
    control: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    value: {
      validator: (v) =>
        typeof v === "string" || typeof v === "number" || v === null,
      required: true,
    },
    label: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  methods: {
    onInput(event) {
      this.$emit("has-input", {
        value: event.target.value,
        control: this.control,
      });
    },
    onBlured () {
      this.$emit('blured', this.control)
    }
  },
};
</script>

<style lang="stylus" scoped>

.form-control
  display: flex
  flex-direction: column
  text-align: left
  margin-bottom: 2rem
  position: relative

.form-control input, .form-control select
  font-size: 1.2rem
  padding: .35em .7em

textarea
  padding: .5em 1em

.invalid
  border-color: red

.error-message
  color: red
  position: absolute
  top: 100%
  font-size: .8rem


</style>
