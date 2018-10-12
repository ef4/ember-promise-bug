import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helpers | foo', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    // this only waits for the render to complete
    await render(hbs`{{if true (foo)}}`);

    // which allows us to assert on the loading state, if we want to
    assert.equal(this.element.textContent.trim(), 'loading');

    // this waits for everything scheduled within Ember to finish. In our case,
    // it will wait for the `later` in our foo helper to run (and it will also
    // wait for the resulting re-render to happen.
    await settled();

    assert.equal(this.element.textContent.trim(), 'text!');
  });
});
