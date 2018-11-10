import 'jquery';
import { secretButton, secretParagraph, arrayDisplay } from './dom-loader';
import '../css/main.scss';

var showSecret = false;

secretButton.addEventListener('click', toggleSecretState);
updateSecretParagraph();

function toggleSecretState() {
    showSecret = !showSecret;
    updateSecretParagraph();
    updateSecretButton()
}

function updateSecretButton() {
    if (showSecret) {
        secretButton.textContent = 'Hide the Secret';
    } else {
        secretButton.textContent = 'Show the Secret';
    }
}

function updateSecretParagraph() {
    if (showSecret) {
        secretParagraph.style.display = 'block';
    } else {
        secretParagraph.style.display = 'none';
    }
}

const materials = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];
arrayDisplay.textContent = (materials.map(material => material.length));

$('.button').click(function(){
  $('.hidden').toggle();
});

