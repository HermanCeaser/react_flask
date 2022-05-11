from flask import Blueprint

api = Blueprint("api", __name__)

from .common import *
from .datastructure import *
from .delay import *
from .iteration import *
from .quicktest import *
from .security import *
from .upload import *
from .users import *

__all__ = (
    security.__all__
    + users.__all__
    + common.__all__
    + datastructure.__all__
    + delay.__all__
    + upload.__all__
    + iteration.__all__
    + quicktest.__all__
)

# Note: Here commonfile_function() namespace is present in all packages
# viz. security, users, common, datastructure and delay inside a module
# named commonfile.py.

# When calling commonfile_function from app.api.v1.security, commonfile_function()
# present inside security will get called.

# When calling commonfile_function from app.api.v1.users, commonfile_function()
# present inside users will get called.

# and so on ..

# But when calling commonfile_function from app.api.v1 or from app.api or
# simply from app commonfile_function() present inside delay will get called.
# This is because in this file commonfile_function() namespace will get
# overridden from import statements in line 9
