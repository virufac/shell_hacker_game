"""empty message

Revision ID: dce6b6fc8553
Revises: c95f334f26ee
Create Date: 2020-04-14 08:08:57.808703

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dce6b6fc8553'
down_revision = 'c95f334f26ee'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('is_email_public', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'is_email_public')
    # ### end Alembic commands ###
