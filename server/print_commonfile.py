from app.api.v1.common import commonfile_function

print(
    "\ncalling commonfile_function from ...\n{}\n{}\n".format(
        "'app.api.v1.common'", commonfile_function()
    )
)

from app.api.v1.security import commonfile_function

print(
    "calling commonfile_function from ...\n{}\n{}\n".format(
        "'app.api.v1.security'", commonfile_function()
    )
)

from app.api.v1.users import commonfile_function

print(
    "calling commonfile_function from ...\n{}\n{}\n".format(
        "'app.api.v1.users'", commonfile_function()
    )
)

from app.api.v1.delay import commonfile_function

print(
    "calling commonfile_function from ...\n{}\n{}\n".format(
        "'app.api.v1.delay'", commonfile_function()
    )
)

from app.api.v1.datastructure import commonfile_function

print(
    "calling commonfile_function from ...\n{}\n{}\n".format(
        "'app.api.v1.datastructure'", commonfile_function()
    )
)

from app.api.v1 import commonfile_function

print(
    "calling commonfile_function from ...\n{}\n{}\n".format(
        "'app.api.v1'", commonfile_function()
    )
)

from app.api import commonfile_function

print(
    "calling commonfile_function from ...\n{}\n{}\n".format(
        "'app.api'", commonfile_function()
    )
)

from app.database import commonfile_function

print(
    "calling commonfile_function from ...\n{}\n{}\n".format(
        "'app.database'", commonfile_function()
    )
)
