from setuptools import setup

setup(
    name='MapStory Tools',
    version=1.0,
    py_modules=['devhelper'],
    install_requires=[
        'Click',
        'PyYAML'
    ],
    entry_points='''
        [console_scripts]
        devhelper=devhelper:cli
    ''',
)
