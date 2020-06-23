const cloudFunction = async (url, data, err) => {
  try {
    let res = await wx.BaaS.invokeFunction(url, data)
    return [null, res]
  } catch (e) {
    return [e, null]
  }
}

const cloudRequest = async (url, data, err) => {
    try {
      let res = await wx.BaaS.invokeFunction({
        url,
        data
      })
      return [null, res]
    } catch (e) {
      return [e, null]
    }
  }

export { cloudRequest, cloudFunction}
