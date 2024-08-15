import { exec, ExecException } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const isError = (e: unknown): e is Error => {
  return (
    typeof e === 'object' &&
    !!e &&
    'name' in e &&
    typeof e.name === 'string' &&
    'message' in e &&
    typeof e.message === 'string'
  );
};

const isExecException = (e: unknown): e is ExecException => {
  return isError(e) && 'cmd' in e && typeof e.cmd === 'string';
};

export const execEslint = async ({
  dir,
  file,
}: {
  dir: string;
  file: string;
}) => {
  const promiseExec = promisify(exec);
  const dirName = dirname(fileURLToPath(import.meta.url));
  try {
    const { stdout } = await promiseExec(
      `npx eslint -c ${dirName}/${dir}/eslint.config.js ${dirName}/${dir}/${file}`,
    );
    return {
      output: stdout,
      error: false,
    };
  } catch (e) {
    if (isExecException(e)) {
      return {
        output: e.stdout ?? '',
        error: true,
      };
    }
    throw e;
  }
};

export const curryExecEslint = (dir: string) => (file: string) =>
  execEslint({ dir, file });
