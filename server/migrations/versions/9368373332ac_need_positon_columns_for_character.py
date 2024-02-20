"""need positon columns for character

Revision ID: 9368373332ac
Revises: ade01c963666
Create Date: 2024-02-16 07:46:00.483248

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9368373332ac'
down_revision = 'ade01c963666'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('characters', schema=None) as batch_op:
        batch_op.add_column(sa.Column('x', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('y', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('area', sa.String(), nullable=True))
        batch_op.drop_column('position')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('characters', schema=None) as batch_op:
        batch_op.add_column(sa.Column('position', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('area')
        batch_op.drop_column('y')
        batch_op.drop_column('x')

    # ### end Alembic commands ###
