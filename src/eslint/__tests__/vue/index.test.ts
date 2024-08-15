import { curryExecEslint } from '../util';

describe('Vue Lint', () => {
  const execEslint = curryExecEslint('vue');

  test('报错', async () => {
    const { output, error } = await execEslint('error.vue');
    expect(error).toBeTruthy();
    expect(output).toMatchSnapshot();
  });

  test('正常通过', async () => {
    const { output, error } = await execEslint('normal.vue');
    expect(error).toBeFalsy();
    expect(output).toMatchSnapshot();
  });
});
