import Helper from '@ember/component/helper';
import { later } from '@ember/runloop'
// import { Promise } from 'rsvp';

export default Helper.extend({
  compute() {
    let pendingResult = this.get('_pendingResult');
    if (pendingResult != null) {
      this.set('_pendingResult', undefined)
      return pendingResult;
    }

    new Promise((resolve) => {
      later(() => { resolve('text!'); });
      // resolve('text!');
    }).then((text) => {
      this.set('_pendingResult', text);
      return this.recompute();
    });

    return '';
  }
})
