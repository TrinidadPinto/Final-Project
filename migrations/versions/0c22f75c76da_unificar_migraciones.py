"""Unificar migraciones

Revision ID: 0c22f75c76da
Revises: 38a59778c833, dd66a31064d2
Create Date: 2025-06-03 22:09:52.866866

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0c22f75c76da'
down_revision = ('38a59778c833', 'dd66a31064d2')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
