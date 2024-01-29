"""changed name of banner column

Revision ID: 0a85c2599b8a
Revises: 847951939e92
Create Date: 2024-01-14 15:45:17.997924

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0a85c2599b8a'
down_revision = '847951939e92'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bases', schema=None) as batch_op:
        batch_op.add_column(sa.Column('wall', sa.String(), nullable=True))
        batch_op.drop_column('banner')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bases', schema=None) as batch_op:
        batch_op.add_column(sa.Column('banner', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('wall')

    # ### end Alembic commands ###
