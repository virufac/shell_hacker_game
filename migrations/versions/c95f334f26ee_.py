"""empty message

Revision ID: c95f334f26ee
Revises: 2c67cf5ee9e4
Create Date: 2020-04-14 08:05:41.172521

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c95f334f26ee'
down_revision = '2c67cf5ee9e4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('is_email_public', sa.Boolean(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'is_email_public')
    # ### end Alembic commands ###
