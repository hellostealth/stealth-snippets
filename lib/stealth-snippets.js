'use babel';

import StealthSnippetsView from './stealth-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  stealthSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.stealthSnippetsView = new StealthSnippetsView(state.stealthSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.stealthSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'stealth-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.stealthSnippetsView.destroy();
  },

  serialize() {
    return {
      stealthSnippetsViewState: this.stealthSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('StealthSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
