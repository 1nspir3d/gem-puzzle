export default function createOptions() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 6; i += 1) {
    const test = i + 3;
    const option = document.createElement('option');
    if (test === 4) {
      option.selected = 'selected';
    }
    option.value = `${test}`;
    option.textContent = `${test}x${test}`;
    option.classList.add('option');
    fragment.appendChild(option);
  }
  return fragment;
}
