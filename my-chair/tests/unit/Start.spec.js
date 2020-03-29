import {shallowMount} from '@vue/test-utils'
import Start from '@/views/Start.vue'

describe('Start.vue', () => {
  const wrapper = shallowMount(Start);

  it('shows header correctly', () => {
    expect(wrapper.find('[data-test=header]').text()).toMatch('Welcome to MyChair');
  });

  it('shows logo correctly', () => {
    expect(wrapper.find('[data-test=logo]').exists()).toBe(true);
  });
});
