const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);
}

function handleReturn(error, stdout) {
  const isReadyForConnections = stdout.search("accepting connections") >= 0;
  if (!isReadyForConnections) {
    process.stdout.write(".");
    checkPostgres();
    return;
  }

  console.log("\n🟢 Postgres pronto\n");
}

process.stdout.write("\n🔴 Aguardando Postgres");
checkPostgres();
