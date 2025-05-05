import View from './View.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  /**
   * Attaches a click handler to pagination buttons
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  /**
   * Generates markup for the pagination buttons based on current page and total pages
   */
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 with more pages
    if (curPage === 1 && numPages > 1)
      return this._generateButton('next', curPage + 1);

    // Last page
    if (curPage === numPages && numPages > 1)
      return this._generateButton('prev', curPage - 1);

    // Middle pages
    if (curPage < numPages) {
      return (
        this._generateButton('prev', curPage - 1) +
        this._generateButton('next', curPage + 1)
      );
    }

    // Only one page
    return '';
  }

  /**
   * Generates markup for a single pagination button
   * @param {'prev'|'next'} type - The direction of the button
   * @param {number} page - The target page number
   */
  _generateButton(type, page) {
    const arrow = type === 'prev' ? 'left' : 'right';
    return `
      <button data-goto="${page}" class="btn--inline pagination__btn--${type}">
        ${
          type === 'prev'
            ? `
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-${arrow}"></use>
          </svg>
          <span>Page ${page}</span>
        `
            : `
          <span>Page ${page}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-${arrow}"></use>
          </svg>
        `
        }
      </button>
    `;
  }
}

export default new PaginationView();
