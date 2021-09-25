onNet('knu_missions:ballas_level_one', (targetPlayerdId) => {

  if (targetPlayerdId === null) {
    return
  }
  global.emitNet("knu_missions:start_ballas_one", targetPlayerdId)
  // const _source = (global as any).source;

  // console.log(`Hello from ${_source}`);

  // emitNet('helloclient', _source, 'i got your message!');
  console.log("from server", targetPlayerdId)
});

onNet('knu_missions:ballas_level_two', (targetPlayerdId) => {

  if (targetPlayerdId === null) {
    return
  }
  global.emitNet("knu_missions:start_ballas_two", targetPlayerdId)
  // const _source = (global as any).source;

  // console.log(`Hello from ${_source}`);

  // emitNet('helloclient', _source, 'i got your message!');
  console.log("from server", targetPlayerdId)
});
