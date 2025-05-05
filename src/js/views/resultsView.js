import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    "Chill out Chef Ramsay, I couldn't find any recipes for that!";
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generatePreviewMarkup).join('');
  }

  _generatePreviewMarkup(result) {
    return previewView.render(result, false);
  }
}

export default new ResultsView();
