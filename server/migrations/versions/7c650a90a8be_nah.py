"""nah

Revision ID: 7c650a90a8be
Revises: 1c2c37336251
Create Date: 2024-02-04 01:57:29.334112

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7c650a90a8be'
down_revision = '1c2c37336251'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.drop_column('item_num')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('items', schema=None) as batch_op:
        batch_op.add_column(sa.Column('item_num', sa.INTEGER(), nullable=True))

    # ### end Alembic commands ###