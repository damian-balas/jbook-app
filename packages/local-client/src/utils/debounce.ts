const debounce = (func: Function, delay: number) => {
  let debounceTimer: any;
  return function (this: any) {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export default debounce;
