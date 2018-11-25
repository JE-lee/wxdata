import _proxy from './proxy'

const originPage = Page

Page = function(config){
  let onLoad = config.onLoad
  config.onLoad = function(){
    _proxy(this, this.data, (data) => {
      this.setData(data)
    })
    onLoad && onLoad.apply(this, arguments)
  }
  originPage(config)
}