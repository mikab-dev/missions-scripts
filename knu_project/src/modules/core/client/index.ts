setImmediate(() => {
  global.RegisterCommand("/myid", (source) => {
    console.log("my player id", global.GetPlayerServerId(-1))
  }, false)
})

setTick(() => {
  if (IsControlJustReleased(1, 38)) {
    emit("knu_kore:interact")
  }
})
