"""empty message

Revision ID: 325cdb836261
Revises: 569ffff9fd17
Create Date: 2020-04-15 00:37:32.450306

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '325cdb836261'
down_revision = '569ffff9fd17'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('campaign_character_sheet_id_fkey', 'campaign', type_='foreignkey')
    op.drop_column('campaign', 'character_sheet_id')
    op.add_column('character_sheet', sa.Column('campaign_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'character_sheet', 'campaign', ['campaign_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'character_sheet', type_='foreignkey')
    op.drop_column('character_sheet', 'campaign_id')
    op.add_column('campaign', sa.Column('character_sheet_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('campaign_character_sheet_id_fkey', 'campaign', 'character_sheet', ['character_sheet_id'], ['id'])
    # ### end Alembic commands ###
