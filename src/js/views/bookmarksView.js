import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'Save some of your favorite recipes :)';
  _message = '';

  /**
   * Registers a handler function to run when the page loads
   * Typically used to render bookmarks on initial load
   */
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  /**
   * Generates HTML markup for the list of bookmarks
   * Uses previewView to render each item
   */
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
