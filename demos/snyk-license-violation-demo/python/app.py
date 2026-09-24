"""Demo: proprietary app importing a GPL-licensed DB driver (training only)."""

import MySQLdb  # noqa: F401 — mysqlclient provides the MySQLdb module


def main() -> None:
    print("Acme Proprietary Analytics (demo)")
    print("MySQLdb module:", MySQLdb.__name__)


if __name__ == "__main__":
    main()
