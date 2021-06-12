function rawToWav(err, req, res) {
  console.log("CONVERT RAW TO WAV");

  res.send("OK");
  if (err.errors) {
    const { errors } = err;
    console.log(error);
  }
}

module.exports = rawToWav;
