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
@click.option('--auto', default=True, help='Automatically create test data')
# @click.option('--users', type=click.File('r'), default='src/data/users.yaml', required=False, help='The users yaml file location')
@click.argument('out', type=click.File('w'), default='-', required=False)
def cli(auto, out):
    """Mapstory Developer Tool
    
    Usage:
        use --auto for creating test data
    """
    # click.echo("Hello %s!" % (name,), file=out)
    # subprocess.Popen(["nohup", "webdriver-manager", "start"])
    # time.sleep(3)

    # Starts the protractor specs
    # subprocess.call("protractor src/conf.js",
    if auto:
        click.echo("Creating automatic test data!", file=out)
        subprocess.call(["protractor","src/conf.js"])



if __name__ == '__main__':
    cli()

