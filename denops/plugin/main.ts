import { Denops, ensure, execute, is } from "../../mod.ts";

export async function main(denops: Denops): Promise<void> {
  // ここに書かれた処理はVimの起動時に行われる。

  // ちなみにconsole.logは直接メッセージとして表示される。
  // console.log("Hello Denops!");

  denops.dispatcher = {
    // 関数の定義。関数はunknownな値を受け取り、Promiseを返す。
    async echo(text: unknown): Promise<unknown> {
      ensure(text, is.String);
      // ensureでtextが文字列である事を保証する。
      return await Promise.resolve(text);
    },
  };

  await execute(
    // Vimで呼び出せる関数として定義する。denopsで定義した関数は`denops#request()`で呼び出せるのｄ，それをラップすれば関数にする事も可能。
    denops,
    `command! -nargs=1 HelloWorldEcho echomsg denops#request('${denops.name}', 'echo', [<q-args>])`,
  );
}
