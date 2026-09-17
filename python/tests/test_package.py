import patterns


def test_package_exposes_version() -> None:
    assert patterns.__version__ == "0.1.0"
