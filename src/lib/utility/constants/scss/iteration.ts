export const ITER_EX_1 = `$colors: (
  primary: #ff8300,
  secondary: #35A7FF,
  success: #0AFF85,
  warning: #fc9106,
  danger: #FF8A9B
);

@each $name, $color in $colors {
  .card.card-#{$name} {
    color: $color;
  }
}`;

export const ITER_EX_1_COMPILED = `.card.card-primary {
  color: #ff8300;
}

.card.card-secondary {
  color: #35A7FF;
}

.card.card-success {
  color: #0AFF85;
}

.card.card-warning {
  color: #fc9106;
}

.card.card-danger {
  color: #FF8A9B;
}`;

export const ITER_MIXIN_EX = `$colors: (
  primary: #ff8300,
  secondary: #35A7FF,
  success: #0AFF85,
  warning: #fc9106,
  danger: #FF8A9B
);

@mixin button($name) {
  background: map-get($colors, $name);
  @if ($name == primary or $name == warning){
    color: white;
  } @else {
    color: black;
  }
}

.card {
  padding: 1ch;
  display: inline-flex;
  align-items: center;
  gap: 1ch;
  
  @each $name, $color in $colors {
    &.card-#{$name}:not(:disabled) {
      @include button($name);
    }
  }
  
  &:disabled {
    background: #585858;
    color: black;
    opacity: 0.4;
  }
  
  &:not(:disabled) {
    opacity: 1;
  }
}`;

export const ITEM_MIXIN_EX_COMPILED = `.card {
  padding: 1ch;
  display: inline-flex;
  align-items: center;
  gap: 1ch;
}
.card.card-primary:not(:disabled) {
  background: #ff8300;
  color: white;
}
.card.card-secondary:not(:disabled) {
  background: #35A7FF;
  color: black;
}
.card.card-success:not(:disabled) {
  background: #0AFF85;
  color: black;
}
.card.card-warning:not(:disabled) {
  background: #fc9106;
  color: white;
}
.card.card-danger:not(:disabled) {
  background: #FF8A9B;
  color: black;
}
.card:disabled {
  background: #585858;
  color: black;
  opacity: 0.4;
}
.card:not(:disabled) {
  opacity: 1;
}`;
