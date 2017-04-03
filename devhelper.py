import click
import subprocess
import time
import yaml

class Struct:
    def __init__(self, **entries):
        self.__dict__.update(entries)


def loadYAML(filename):
    f = open('tree.yaml')
    # use safe_load instead load
    data_map = yaml.safe_load(f)
    f.close()

    return data_map


@click.command()
@click.option('--name', default='World', help='Overrides the name to greet')
@click.option('--repeat', default=1, help='Times to repeat')
@click.argument('out', type=click.File('w'), default='-', required=False)
def cli(name, repeat, out):
    """The classic greeting"""

    click.echo("Hello %s!" % (name,), file=out)

    # subprocess.Popen(["nohup", "webdriver-manager", "start"])
    # time.sleep(3)

    # Starts the protractor specs
    # subprocess.call("protractor src/conf.js",
    subprocess.call(["protractor","src/conf.js"])


if __name__ == '__main__':
    cli()

