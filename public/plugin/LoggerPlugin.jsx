class LoggerPlugin{
  constructor(emitCallback,doneCallback){
    this.emitCallback = emitCallback;
    this.doneCallback = doneCallback;

  }

  apply(compiler){
    compiler.hooks.emit.tap('LoggerPlugin', () => {
      // 生成资源到并输出目录之前
      this.emitCallback();
    });
    compiler.hooks.done.tap('LoggerPlugin', (err) => {
      // 编译完成的回调
      this.doneCallback();
    });
  }
}
module.exports =LoggerPlugin;