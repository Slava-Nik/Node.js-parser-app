exports.home = (req, res) => {
  res.status(200).send(`

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>SlavaNik parser app</title>
</head>
<body>
  <h2>SlavaNik parser app</h2>
  <a href="/parser">Go to the parser page</a>
</body>
</html>`);
};
