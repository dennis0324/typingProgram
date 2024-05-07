from setuptools import setup
import py2exe

# name, description, version등의 정보는 일반적인 setup.py와 같습니다.
setup(name="test_py2xxx",
      description="py2exe test application",
      version="0.0.1",
      windows=[{"script": "run.py"}],
      options={
          "py2exe": {
              # PySide 구동에 필요한 모듈들은 포함시켜줍니다.
              "includes": ["PySide.QtCore",
                           "PySide.QtGui",
                           "PySide.QtWebKit",
                           "PySide.QtNetwork",
                           "PySide.QtXml"],
              # 존재하지 않거나 불필요한 파일은 제거합니다.
              "dll_excludes": ["msvcr71.dll",
                               "MSVCP90.dll"],
          }
      })