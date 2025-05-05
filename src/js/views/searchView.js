class SearchView {
  _parentEl = document.querySelector('.search');
  _inputEl = this._parentEl.querySelector('.search__field');

  getQuery() {
    const query = this._inputEl.value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._inputEl.value = '';
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
