"""spelled accuracy wrong

Revision ID: 6c2bf5c42b40
Revises: 44f2d623f521
Create Date: 2023-12-23 15:12:24.871584

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6c2bf5c42b40'
down_revision = '44f2d623f521'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('moves', schema=None) as batch_op:
        batch_op.add_column(sa.Column('accuracy', sa.Integer(), nullable=True))
        batch_op.drop_column('accuraccy')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('moves', schema=None) as batch_op:
        batch_op.add_column(sa.Column('accuraccy', sa.INTEGER(), nullable=True))
        batch_op.drop_column('accuracy')

    # ### end Alembic commands ###
