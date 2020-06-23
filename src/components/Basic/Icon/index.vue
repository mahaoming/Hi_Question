<template>
  <text
    class="hi-icon"
    :class="[`hi-icon-${name}`, name, size]"
    :style="{
      color
    }"
    @click="$emit('click', $event)"
  ></text>
</template>

<script>
export default {
  name: "hi-icon",
  props: {
    name: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: "md"
    },
    color: {
      type: String,
      default: ""
    },
    index: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss">
@charset 'UTF-8';
@font-face {
  font-family : 'iconfont';
  font-weight : normal;
  font-style : normal;

  src : url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAALoAAsAAAAABuwAAAKcAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqBHIEXATYCJAMQCwoABCAFhG0HVBsVBsgusG3YkyKBNrBwx51IvT3S8WyIh6/9+J27u0++aVJvH5XpJDHJMF08FQjVSqWbTLf/XdM/Rp35shqTQlv8SdOD3MvlxuwIJIExwEJubnXLX/D6Hug9/pfEPQA+z+X0JtCBzG9n5zbbNtaiKz/qBRgHFOBeGEVWQIHFiWgWdbsSGUO/rNsEOk1wSTnY2T8E2YpwUSBuchaG7E5BUfR2K9QTO4t4qdKmR+kLeFG8P74JRDZJlYUrD13uiEHzx5IzzP+fh5MZoUjg+ytkrAGFuDrZOC9N6Fyazs+k2wy0WomPkKxMznwV4sVa9JdHEjJRC+3dYEM0Mx8hUUh8rFQIPs7YZPghgbbbmgTWJTvmjeg3dHc3R9jt1jIe3c0VXry+H7vaXKHHj4tF569u3TZRNhDbefq0orqi/vTP76kIvK/rzX9vaqvaXn7+4E+6Kybke6njAOTtxRf8l5ae90EKgoVnDWawqP42r4APlXtnLPdfOmB+IIoBG9QzwL7iWWGwFMeV6H6q6IYWJHTqBM06DPo9IzAC9xJaIztSjfEGWWuOLOwaKl02UGvtQadVXfu7DJHSROnAihWG0O8RSa83yPp9k4X9QWXUP2r9kYZOh6PsxC4LwXPbJIYVxkhkgvCoMGkcVrll9wAyRw/LtlXwIyhtXiZ+j6/f7kIT5Rlr7FEWUIoSKoVBOtl9qOuCWFIkMKo8caWsWq+XTj3JExUG5DpAQmEKiiEiJhBclGCi2XAld/D6AYhx6MLkgqOrHoEkGx+f8PPwAWSXz4Qc3/KIbRQToCgUQUmCgehkMaRHDYGwpqcloCjFI76jZqnlFYMo6vPcHzAoPAKdwptKpMhRotKek1KMuR0rt3THkrBZ+hUTEzxsKuFMOgIA')
  format('woff2');
}

.hi-icon {
  display : inline-block;

  font-family : 'iconfont' !important;
  font-size : 32rpx;
  font-weight : normal;
  font-style : normal;
  font-variant : normal;
  line-height : 1;
  letter-spacing : 0;
  text-transform : none;

  -webkit-font-smoothing : antialiased;
  -moz-osx-font-smoothing : grayscale;

  &.xss {
    font-size : $icon-size-xss;
  }
  &.xs {
    font-size : $icon-size-xs;
  }
  &.sm {
    font-size : $icon-size-sm;
  }
  &.md {
    font-size : $icon-size-md;
  }
  &.lg {
    font-size : $icon-size-lg;
  }
  &:before {
    position : relative;
    z-index : 2;

    -webkit-font-smoothing : antialiased;
    -moz-osx-font-smoothing : grayscale;
  }
}

.hi-icon-arrow-up:before {
  content : '\e616';
}

.hi-icon-arrow-down:before {
  content : '\e600';
}

.hi-icon-iconfontjiantouzuo:before {
  content : '\e67d';
}

</style>
